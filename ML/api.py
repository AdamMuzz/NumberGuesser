from tensorflow import keras
import numpy as np

'''
being executed from nodejs subprocess
root is /backend folder
'''

#grab model from save
model = keras.models.load_model('../model')

print('loaded model successfully')

