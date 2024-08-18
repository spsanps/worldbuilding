from api_wrappers.together import TogetherAPI
from .prompts import STORY_GENERATION_PROMPT, PROMPT_IDEAS_GENERATION

def generate_story_scene(model_name: str, input_text: str) -> str:
    """
    Generate a detailed 2-3 page story scene based on the given input.
    
    :param model_name: The name of the language model to use.
    :param input_text: The input text to base the story scene on.
    :return: A string containing the generated story scene.
    """
    together_api = TogetherAPI()
    
    prompt = STORY_GENERATION_PROMPT.format(input=input_text)
    messages = [{"role": "user", "content": prompt}]
    
    response = together_api.chat_completion(model_name, messages)
    return response.strip()

def generate_prompt_ideas(model_name: str, theme: str) -> list:
    """
    Generate a list of 10 writing prompt ideas based on the given theme.
    
    :param model_name: The name of the language model to use.
    :param theme: The theme or concept to base the prompts on.
    :return: A list of strings, each containing a writing prompt idea.
    """
    together_api = TogetherAPI()
    
    sys_prompt = PROMPT_IDEAS_GENERATION
    messages = [{"role": "system", "content": sys_prompt}, {"role": "user", "content": theme}]
    
    response = together_api.chat_completion(model_name, messages)
    
    # Parse the response into a list of prompts
    prompts = response.strip().split('\n')
    prompts = [p.strip() for p in prompts if p.strip()]

    # remove lines that don't start with a number
    prompts = [p for p in prompts if p[0].isdigit()]
    
    # Remove numbering if present
    prompts = [p[p.find(' ')+1:] if p[0].isdigit() else p for p in prompts]
    
    return prompts

if __name__ == "__main__":
    model_name = "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo"
    
    # Example usage of generate_story_scene
    input_text = "A lone explorer discovers an ancient alien artifact on a distant planet."
    story_scene = generate_story_scene(model_name, input_text)
    print("Generated Story Scene:")
    print(story_scene)
    print("\n" + "="*50 + "\n")
    
    # Example usage of generate_prompt_ideas
    theme = "Time travel paradoxes"
    prompt_ideas = generate_prompt_ideas(model_name, theme)
    print("Generated Prompt Ideas:")
    for i, idea in enumerate(prompt_ideas, 1):
        print(f"{i}. {idea}")