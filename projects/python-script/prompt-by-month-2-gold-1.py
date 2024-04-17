import pandas as pd

# Load the data
data = pd.read_csv('sales_data_sample_10.csv', parse_dates=['ORDERDATE'])

# Extract year and month from the order date
data['YearMonth'] = data['ORDERDATE'].dt.to_period('M')

# Calculate the total sales amount by month
sales_by_month = data.groupby('YearMonth')['SALES'].sum()

# Create a complete range of months from min to max date in the data
all_months = pd.period_range(data['YearMonth'].min(), data['YearMonth'].max(), freq='M')

# Reindex the sales data to include all months, filling missing months with 0
sales_by_month = sales_by_month.reindex(all_months, fill_value=0)

# Save the result to a CSV file
sales_by_month.to_csv('sales_amount_by_month.csv')
