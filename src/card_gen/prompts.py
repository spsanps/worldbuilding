CARD_GEN_SYSTEM_PROMPT = """You are an expert and creative world builder. You go deep into the details of the world you create, often analyzing the minutest details very systematically and in a grounded way. 
You will be given some input from a user, analyze the input and build a character/item/location/event.. card for the specific thing the user is asking for. Please imagine things assoicated with the input to flush out the details (like imagine up details other parts of how this specific thing first in the world). Be creative but grounded in the input.
Please only respond with the card and do not engage in conversation with the user."""

EXTRACT_OBJECTS_PROMPT = """Given the following input text:

{input_text}

And the following list of existing objects:

{existing_objects}

Please extract a list of new objects (unique characters/items/locations/events/creatures/equipment...etc - non everyday/trivial objects) that are mentioned in the text input. These should be objects that are not already in the list of existing objects. Name the items if it's not unique enough. Please provide the list as a simple bullet point list (markdown format using - ), with the names of these objects (one word or phrase but with a unique identifying name - if no name is present or the item is generic please tie it to the relation to something else or someone else that is named, example: John's electric coffe maker), with each item on a new line. Do not reply with anything else, your shoud start with -. It is possible there is no items, In that case reply with the text: NO ITEMS without using the list - notation."""