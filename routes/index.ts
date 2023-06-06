import {OpenAIApi,Configuration} from "openai";
import type {FastifyRequest} from "fastify";
import blobServiceClient from "../app/functions/blob-service"

const configuration = new Configuration({
    apiKey:'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'
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
    //     // fastify.pg.query(
    //     //     "SELECT * FROM testtable",
    //     //     function onResult (err, result) {
    //     //         reply.send(err || result['rows'])
    //     //     }
    //     // )
    // })
    //
    fastify.get('/', async function(req, reply) {
        let i = 1;
        let containers = blobServiceClient.listContainers() as any;
        for await (const container of containers) {
            console.log(`Container ${i++}: ${container.name}`);
        }
    })

    fastify.post('/generate', async (req:FastifyRequest<{ Body: BodyType }>,res) => {
        const prompt = req.body.prompt;
        const imageUrl = await generateImage(prompt,2)
        const containerName = "icons";
        const blobName = "newblob" + new Date().getTime();
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(imageUrl, imageUrl.length);
        console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

        // await generateImage(prompt,1)

        res.send("worked")
    })
    done()
}

export default generateIconRoutes;