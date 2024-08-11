# train an AI model
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load the data
data = pd.read_csv('data.csv')
X = data.drop('target', axis=1)
y = data['target']

# Split the data

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train the model

model = RandomForestClassifier()

model.fit(X_train, y_train)

# Evaluate the model

model.score(X_test, y_test)
