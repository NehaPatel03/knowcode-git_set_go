import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import pickle

# Load the dataset
data = pd.read_csv('./templates/SHG_Scheme_Recommendation_Updated.csv')

# Preprocessing
label_encoders = {}
for column in ['STATE', 'CASTE', 'GENDER', 'SECTOR', 'SCHEME']:
    le = LabelEncoder()
    data[column] = le.fit_transform(data[column])
    label_encoders[column] = le

# Splitting features and target
X = data.drop(columns=['SCHEME'])
y = data['SCHEME']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize numerical features
scaler = StandardScaler()
X_train[['AGE', 'ANNUAL_INCOME']] = scaler.fit_transform(X_train[['AGE', 'ANNUAL_INCOME']])
X_test[['AGE', 'ANNUAL_INCOME']] = scaler.transform(X_test[['AGE', 'ANNUAL_INCOME']])

# Train a Random Forest Classifier
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save the model, scaler, and label encoders
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

with open('label_encoders.pkl', 'wb') as f:
    pickle.dump(label_encoders, f)
