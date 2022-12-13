import pandas as pd
from keras.datasets import imdb
from keras import Sequential
from keras.layers import Dense,MaxPool1D,Embedding,SimpleRNN,GlobalAveragePooling1D,LSTM
from keras.preprocessing.text import Tokenizer
from keras.utils import pad_sequences
import numpy as np
from keras.callbacks import LambdaCallback
from sklearn.metrics import confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from sklearn.model_selection import train_test_split
import random
import pickle
import sys
tk=[]
with open('tokenizer.pickle', 'rb') as handle:
    tk = pickle.load(handle)
model = Sequential()
model.add(Embedding(30000,8))
model.add(MaxPool1D((8)))
model.add(SimpleRNN(20,return_sequences=True,activation='relu'))
model.add(GlobalAveragePooling1D())
model.add(Dense(8,activation='relu'))
model.add(Dense(1,activation='sigmoid'))
test=sys.argv[1]
l=tk.texts_to_sequences(test)
l=pad_sequences(l,padding='post',maxlen=26)
model.load_weights('FinalclickbaithRNN.hdf5')
Y_result=model.predict(l,verbose=False)
print(Y_result[0][0])