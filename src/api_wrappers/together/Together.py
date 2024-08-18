import os
import asyncio
from pathlib import Path
from together import Together, AsyncTogether

class TogetherAPI:
    def __init__(self):
        self._api_key = self._get_api_key()
        os.environ['TOGETHER_API_KEY'] = self._api_key

    def _get_api_key(self):
        current_dir = Path(__file__).resolve().parent
        key_file = current_dir / 'together.key'
        try:
            with open(key_file, 'r') as f:
                return f.read().strip()
        except FileNotFoundError:
            raise FileNotFoundError(f"API key file not found at {key_file}. Please ensure the file exists.")

    def chat_completion(self, model, message, **kwargs):
        client = Together(api_key=self._api_key)
        output = client.chat.completions.create(
            model=model,
            messages=message,
            stream=False,
            **kwargs
        )
        return output.choices[0].message.content

    async def async_chat_completion(self, model, messages, **kwargs):
        async_client = AsyncTogether(api_key=self._api_key)
        tasks = [
            async_client.chat.completions.create(
                model=model,
                messages=message,
                **kwargs
            ) for message in messages
        ]
        responses = await asyncio.gather(*tasks)
        return [response.choices[0].message.content for response in responses]

# Create a single instance to be used throughout the application
together_api = TogetherAPI()

# Example usage
if __name__ == "__main__":
    # Synchronous example
    model = "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"
    message = "What are some fun things to do in New York?"
    response = together_api.chat_completion(model, message)
    print("Synchronous response:", response)

    # Asynchronous example
    async def main():
        model = "mistralai/Mixtral-8x7B-Instruct-v0.1"
        messages = [
            "What are the top things to do in San Francisco?",
            "What country is Paris in?",
        ]
        responses = await together_api.async_chat_completion(model, messages)
        print("Asynchronous responses:")
        for response in responses:
            print(response)

    asyncio.run(main())