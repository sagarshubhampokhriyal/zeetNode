from keras.datasets import imdb
from keras import Sequential
from keras.layers import Dense,MaxPool1D,Embedding,SimpleRNN,GlobalAveragePooling1D,LSTM
from keras.preprocessing.text import Tokenizer
from keras.utils import pad_sequences
import numpy as np
import sys
from keras.callbacks import LambdaCallback
from sklearn.metrics import confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import pickle
word_index=imdb.get_word_index()

x = str(sys.argv[1]).split()
X=[]
for i in range(len(x)):
    for key,value in word_index.items():
        if key==x[i]:
            X.append(word_index[x[i]])
            break
            
    
X=np.array(X).reshape(1,-1)
X_test=pad_sequences(X,value=word_index['the'],padding='post',maxlen=800)
# print(X_test)
model = Sequential()
model.add(Embedding(88584,16))
model.add(MaxPool1D((16)))
model.add(SimpleRNN(20,return_sequences=True,activation='relu'))
model.add(GlobalAveragePooling1D())
model.add(Dense(16,activation='relu'))
model.add(Dense(1,activation='sigmoid'))
model.load_weights("FinalRNN.hdf5")
res=model.predict(X_test,verbose=False)
print(res[0][0])
