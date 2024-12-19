# import sys
# import json
# import pickle
# import numpy as np

# with open('banglore_home_pricess_model.pickle', 'rb') as model_file:
#     model = pickle.load(model_file)

# # Get the input data from arguments (sent from Node.js)
# data = json.loads(sys.argv[1])  # The data passed as argument
# bhk = data['bhk']
# bath = data['bath']
# location = data['location']


# def predict_price(location, sqft, bath, bhk):
#     # this is to locate the actual location in the column of the data table in 2D
#     loc_index = np.where(X.columns == location)[0][0]

#     # create a n numbers of index as per the number of the columns in the datatable set all to 0 default
#     x = np.zeros(len(X.columns))
#     # total_sqft	bath	price	bhk loc1 loc2 loc3 .........so on

#     # chnagin the index values according to the input from the user
#     x[0] = sqft
#     x[1] = bath
#     x[2] = bhk

#     # this will;  change the indesx of given loc to 1 remaining are 0 as defaults
#     if loc_index >= 0:
#         x[loc_index] = 1


# # the col shape of the x will be 260 where the index of location part is 1 of given location and  remaining are 0's
#     return model.predict([x])[0]
# prediction = model.predict([[bhk, bath, location]])

# # Output the prediction
# print(prediction)


import numpy as np
import pickle
import pandas as pd
import json

with open('columns.json', 'r') as f:
    loc_data = json.load(f)
    data_columns = loc_data['data-columns']


# Update with the actual model file location
model_file = 'banglore_home_pricess_model.pickle'
lr = pickle.load(open(model_file, 'rb'))

# Assuming you have a feature set 'X' (with all columns including 'location', 'sqft', etc.)
# You may also need to load the feature set X if it's saved separately, e.g., from a CSV file


def predict_price(location, sqft, bath, bhk):
    # Logic to handle the feature preprocessing
    # Assuming X is your feature DataFrame
    print(location, sqft, len(data_columns))

    # Create a zeroed array to hold feature values
    x = np.zeros(len(data_columns) + 3)
    x[0] = sqft
    x[1] = bath
    x[2] = bhk

    if location in data_columns:
        loc_index = data_columns.index(location)
        x[loc_index + 3] = 1

    return round(lr.predict([x])[0], 2)


# Main block to allow execution from command-line arguments
if __name__ == "__main__":
    import sys
    # location = sys.argv[1]
    # sqft = float(sys.argv[2])
    # bath = int(sys.argv[3])
    # bhk = int(sys.argv[4])

    # Call the prediction function and print the result
    # prediction = predict_price(location, sqft, bath, bhk)
    print(predict_price('Indira Nagar', 1000, 3, 3))
