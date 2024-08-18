from api_wrappers.together import TogetherAPI

import sys
import os
import pandas as pd
from uuid import uuid4
from typing import List, Dict, Any, Optional
from .prompts import CARD_GEN_SYSTEM_PROMPT, EXTRACT_OBJECTS_PROMPT

class ObjectManager:
    def __init__(self, db_path: Optional[str] = None):
        self.objects = {}
        self.db_path = db_path
        if db_path and os.path.exists(db_path):
            self.load_from_db()

    def __getitem__(self, key):
        return self.objects[key]

    def __setitem__(self, key, value):
        self.objects[key] = value
        if self.db_path:
            self.save_to_db()

    def __contains__(self, key):
        return key in self.objects

    def generate_id(self) -> str:
        return str(uuid4())

    def add_object(self, obj: Dict[str, Any], obj_id: Optional[str] = None) -> str:
        if obj_id is None:
            obj_id = self.generate_id()
        self[obj_id] = obj
        return obj_id

    def load_from_db(self):
        df = pd.read_csv(self.db_path)
        self.objects = df.set_index('object_id').to_dict('index')

    def save_to_db(self):
        df = pd.DataFrame.from_dict(self.objects, orient='index')
        df.index.name = 'object_id'
        if self.db_path:
            df.to_csv(self.db_path)
        else:
            print("No database path provided, cannot save.")

def generate_card(model_name: str, user_prompt: str) -> str:

    together_api = TogetherAPI()

    messages = [
        {"role": "system", "content": CARD_GEN_SYSTEM_PROMPT},
        {"role": "user", "content": user_prompt}
    ]
    return together_api.chat_completion(model_name, messages)

def extract_objects(model_name: str, input_text: str, existing_objects: List[str]) -> List[str]:

    together_api = TogetherAPI()

    prompt = EXTRACT_OBJECTS_PROMPT.format(
        input_text=input_text,
        existing_objects=", ".join(existing_objects),
        #object_types=", ".join(object_types)
    )
    messages = [{"role": "user", "content": prompt}]
    response = together_api.chat_completion(model_name, messages)
    print(response)
    
    # Simple parsing of the response
    try:
        object_list = response.strip().split('\n')
        object_list = [obj for obj in object_list if "-" in obj]
        object_list = [obj.strip() for obj in object_list if obj.strip()]
        object_list = [obj.strip('-').strip() for obj in object_list]
        object_list = [obj for obj in object_list if obj]
        return object_list
    except Exception as e:
        print(f"Error parsing response: {e}")
        return []

if __name__ == "__main__":
    together_api = TogetherAPI()
    model_name = "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo"
    
    # Example usage of generate_card
    user_prompt = "Create a character card for a cyberpunk hacker."
    card = generate_card(together_api, model_name, user_prompt)
    print("Generated Card:")
    print(card)
    
    # Example usage of ObjectManager
    manager = ObjectManager(db_path="objects.csv")
    card_id = manager.add_object({"type": "character", "content": card})
    print(f"Card added with ID: {card_id}")
    
    # Example usage of extract_objects
    input_text = "In the neon-lit streets of Neo-Tokyo, a skilled hacker named Zephyr encounters a mysterious AI called Nexus."
    existing_objects = ["Zephyr"]
    #object_types = ["characters", "locations", "items"]
    extracted_objects = extract_objects(together_api, model_name, input_text, existing_objects)
    print("Extracted Objects:")
    print(extracted_objects)