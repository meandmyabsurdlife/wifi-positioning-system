import sys
import json
import pandas as pd

import os
from joblib import load

#print('Pemanggilan Data diterima')
data_str = str(sys.argv[1])
#print('Data string diterima:', data_str)
#print('tipe data:', type(data))

# Ubah ke JSON
data_json = json.loads(data_str)
data_json.pop("_id", None) # Hilangkan kolom _id
#print('Data JSON diterima:',data_json)

# Ubah ke DataFrame
df = pd.DataFrame.from_dict(data_json, orient='index').T
#print(df)

current_dir = os.path.dirname(os.path.abspath(__file__))
#model_path = os.path.join(current_dir, "model_rfc.pkl")
model_path = os.path.join(current_dir, "final_rfc_model.pkl")
features_path = os.path.join(current_dir, "features.json")

with open(features_path, 'r') as f:
    features = json.load(f)

#X = df.drop(['FLOOR','BUILDINGID','SPACEID','RELATIVEPOSITION'], axis=1)
#X = df.filter(regex='^WAP', axis=1)

# Pilih kolom yang diawali dengan 'WAP' dan kolom 'TIMESTAMP'
X = df.filter(regex='^(WAP|TIMESTAMP)', axis=1)
X = X.reindex(columns=features, fill_value=100)
y = df[['FLOOR','BUILDINGID','SPACEID','RELATIVEPOSITION']]

#print('X:', X) #untuk debugging
#print('y', y) #untuk debugging

# Ganti model_path menjadi path absolut
#print("path model machine learning:", model_path)

# Load model
with open(model_path, 'rb') as file:
    loaded_model = load(model_path)

#Cek fitur yang dipakai saat training
#print("Fitur yang dilatih:", loaded_model.feature_names_in_)
# Prediksi model
y_pred = loaded_model.predict(X)
#print("y_pred:", y_pred)
#print('y:', y)

# Mengembalikan hasil prediksi dalam format JSON yang lebih deskriptif
result = {
    "predicted_floor": int(y_pred[0][0]),
    "predicted_building_id": int(y_pred[0][1]),
    "predicted_space_id": int(y_pred[0][2]),
    "predicted_relative_position": int(y_pred[0][3]),
}

# Pastikan hasilnya valid JSON
print(json.dumps(result))  # Mengirimkan hasil prediksi sebagai JSON