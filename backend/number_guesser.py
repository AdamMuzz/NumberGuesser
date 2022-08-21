from tensorflow import keras
import numpy as np

#grab necessary data to test
(X_train, Y_train), (X_test, Y_test) = keras.datasets.mnist.load_data()
X_test_flat = X_test.reshape(len(X_test), 28*28)
X_test_fs = X_test_flat / 255

#grab model from save
model = keras.models.load_model('./model')

#code for how to test on single input
test = X_test_fs[0].reshape(1,784)
prediction = model.predict(test)
rez = np.argmax(prediction)
print(f'{rez}: confidence {prediction[0][rez]:.2f}')