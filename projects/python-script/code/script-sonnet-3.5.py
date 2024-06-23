import pandas as pd
from datetime import datetime

# Read the CSV file
df = pd.read_csv('sales_data_sample_10.csv')

# Convert ORDERDATE to datetime
df['ORDERDATE'] = pd.to_datetime(df['ORDERDATE'])

# Extract year and month
df['YEAR_MONTH'] = df['ORDERDATE'].dt.to_period('M')

# Group by year and month, sum the sales
sales_by_month = df.groupby('YEAR_MONTH')['SALES'].sum().reset_index()

# Sort by date
sales_by_month = sales_by_month.sort_values('YEAR_MONTH')

# Format YEAR_MONTH as string
sales_by_month['YEAR_MONTH'] = sales_by_month['YEAR_MONTH'].astype(str)

# Rename columns
sales_by_month.columns = ['Month', 'Total Sales']

# Save to CSV
sales_by_month.to_csv('sales_amount_by_month-sonnet-3.5.csv', index=False)