from tensorflow import keras
import numpy as np
import json, sys

'''
being executed from nodejs subprocess
root is therefore /backend folder
'''

#grab canvas data from command line args and preprocess it
input = json.loads(sys.argv[1])
input = np.array(input)
input = input / 255
input = input.reshape(1,784)

#grab model from save
model = keras.models.load_model('../model')

#run model on input
prediction = model.predict(input)
rez = np.argmax(prediction)
print(f'{rez}: confidence {prediction[0][rez]:.3f}')