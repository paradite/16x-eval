import pandas as pd

# Load the data
data = pd.read_csv('sales_data_sample_10.csv', parse_dates=['ORDERDATE'])

# Extract year and month from the order date
data['YearMonth'] = data['ORDERDATE'].dt.to_period('M')

# Calculate the total sales amount by month
sales_by_month = data.groupby('YearMonth')['SALES'].sum()

# Save the result to a CSV file
sales_by_month.to_csv('sales_amount_by_month.csv')