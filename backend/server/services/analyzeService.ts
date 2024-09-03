import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

export async function analyzeImage(imagePath: string) {
    const apiKey = process.env.OPENAI_API_KEY;
    const url = 'https://api.openai.com/v1/images/generations';

    const formData = new FormData();
    formData.append('file', fs.createReadStream(imagePath));

    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                ...formData.getHeaders(),
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(`Failed to analyze image: ${error.message}`);
    }
}
