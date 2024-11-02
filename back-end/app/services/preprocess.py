import pandas as pd
import nltk
import re
import string
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Download required NLTK data
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt')

class TextPreprocessor:
    def __init__(self):
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))

    def preprocess_text(self, text: str) -> str:
        """Preprocesses the input text."""
        # Remove control characters
        cleaned_text = re.sub(r'[\n\r\t]', ' ', text)
        cleaned_text = re.sub(r'[^\x00-\x7E]+', '', cleaned_text)
        
        # Remove punctuation
        text_without_punctuation = cleaned_text.translate(
            str.maketrans('', '', string.punctuation)
        )
        
        # Tokenize
        tokens = text_without_punctuation.split()
        
        # Lemmatize and remove stopwords
        processed_tokens = [
            self.lemmatizer.lemmatize(token.lower()) 
            for token in tokens 
            if token.lower() not in self.stop_words and token.isalpha()
        ]
        
        return ' '.join(processed_tokens)

preprocessor = TextPreprocessor()