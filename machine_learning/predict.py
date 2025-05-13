import sys
import json
import pandas as pd

import os
from joblib import load

# Pemanggilan Data yang diterima dari controller
data_str = str(sys.argv[1])

# Ubah ke JSON
data_json = json.loads(data_str)
data_json.pop("_id", None) # Hilangkan kolom _id

# Ubah ke DataFrame
df = pd.DataFrame.from_dict(data_json, orient='index').T
# Ubah nilai 100 ke -105
df.replace(100, -105, inplace=True)
# Tambahkan kolom UNIQUEID
df['UNIQUEID'] = df['BUILDINGID']*1000 + df['SPACEID']

current_dir = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(current_dir, "model_rfc_alternative1.pkl")
features_path = os.path.join(current_dir, "features.json")

with open(features_path, 'r') as f:
    features = json.load(f)

# Pilih kolom yang diawali dengan 'WAP' dan kolom 'TIMESTAMP'
X = df.filter(regex='^(WAP|TIMESTAMP)', axis=1)
X = X.reindex(columns=features, fill_value=100)
y = df[['UNIQUEID','FLOOR','RELATIVEPOSITION']]#y = df[['FLOOR','BUILDINGID','SPACEID','RELATIVEPOSITION']]
# print(y)

# Load model
with open(model_path, 'rb') as file:
    loaded_model = load(model_path)

# Prediksi model
y_pred = loaded_model.predict(X)
# print(y_pred)

# Mengembalikan hasil prediksi dalam format JSON yang lebih deskriptif
predicted_building_id = int(y_pred[0][0]) // 1000
predicted_floor = int(y_pred[0][1])
predicted_space_id = int(y_pred[0][0]) % 1000
predicted_relative_position = int(y_pred[0][2])

result = {
    "predicted_floor": predicted_floor,
    "predicted_building_id": predicted_building_id,
    "predicted_space_id": predicted_space_id,
    "predicted_relative_position": predicted_relative_position,
}

# Pastikan hasilnya valid JSON
print(json.dumps(result))  # Mengirimkan hasil prediksi sebagai JSON