import tensorflow as tf
from tensorflow import keras 
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense,Conv2D,MaxPool2D,Flatten,BatchNormalization,Dropout
import sys
import cv2
import numpy as np
file="TESTCNN.hdf5"

model1=Sequential()

model1.add(Conv2D(16,(3,3),activation='relu',input_shape=(150,150,1)))
model1.add(MaxPool2D((2,2)))
model1.add(Conv2D(32,(3,3),activation='relu'))
model1.add(MaxPool2D((2,2)))
model1.add(Conv2D(64,(3,3),activation='relu'))
model1.add(MaxPool2D((2,2)))
model1.add(Flatten())
model1.add(Dense(16,activation='relu'))
model1.add(BatchNormalization(axis=1))
model1.add(Dense(1,activation='sigmoid'))
model1.load_weights(file)

filename= 'C:/Users/Shubham/Desktop/internship project/Images/img.jpeg'
img_arr=cv2.imread(filename,cv2.IMREAD_GRAYSCALE)
new_img=cv2.resize(img_arr ,(150,150),interpolation=cv2.INTER_AREA)
test=np.reshape(new_img,(1,150,150,1))
prob=model1.predict(test ,verbose=False)
print(prob[0][0])