import {OpenAIApi,Configuration} from "openai";
import type {FastifyRequest} from "fastify";
import blobServiceClient from "../app/functions/blob-service"

const configuration = new Configuration({
    apiKey:process.env.OPEN_API_KEY
})

const openAi = new OpenAIApi(configuration)
interface BodyType {
    prompt: string
}

async function generateImage(prompt:string,n:number) {
    const response = await openAi.createImage({
        prompt,
        n,
        response_format: "b64_json",
    })
    // console.log(response)
    return Buffer.from(response.data.data[0]['b64_json'],'base64')
}
function generateIconRoutes(fastify, _,done) {

    // fastify.get('/', function (req, reply) {
    //     fastify.pg.query(
    //         "SELECT * FROM testtable",
    //         function onResult (err, result) {
    //             reply.send(err || result['rows'])
    //         }
    //     )
    // })

    fastify.get('/', async function(req, reply) {
        let i = 1;
        let containers = blobServiceClient.listContainers() as any;
        fastify.pg.query(
            "SELECT * FROM icons",
            function onResult (err, result) {
                reply.send(err || result['rows'])
            }
        )
        console.log("teste")
        for await (const container of containers) {
            console.log(`Container ${i++}: ${container.name}`);
        }
    })

    fastify.get('/get' ,async (req,res) => {
            const containerClient = blobServiceClient.getContainerClient('icons');
            let i = 1;
            console.log('1')
            const blobs = await containerClient.listBlobsFlat();
            console.log('2')

            let arrayOfObject = [];
            for await (const blob of blobs) {
              console.log(`Blob ${i++}: ${blob.name}`);
              arrayOfObject.push(blob.name)
            }

            const tempBlockBlobClient = containerClient.getBlockBlobClient(arrayOfObject[0]);

            return tempBlockBlobClient
      }

    )

    fastify.post('/generate', async (req:FastifyRequest<{ Body: BodyType }>,res) => {
        const prompt = req.body.prompt;
        const imageUrl = await generateImage(prompt,2)
        const containerName = "icons";
        const blobName = "newblob" + new Date().getTime();
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(imageUrl, imageUrl.length);
        fastify.pg.query(
          `INSERT INTO icons (image_id) VALUES (blobName)`,
          function onResult (err, result) {
            res.send(err || result['rows'])
          }
        )

        console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse);
    })
    done()
}

export default generateIconRoutes;