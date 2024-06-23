import pandas as pd

df = pd.read_csv('sales_data_sample_10.csv')
df['ORDERDATE'] = pd.to_datetime(df['ORDERDATE'])
df['YEAR_MONTH'] = df['ORDERDATE'].dt.to_period('M')

date_range = pd.period_range(start=df['YEAR_MONTH'].min(), end=df['YEAR_MONTH'].max(), freq='M')

sales_by_month = df.groupby('YEAR_MONTH')['SALES'].sum().reset_index()
all_months = pd.DataFrame({'YEAR_MONTH': date_range})
sales_by_month = pd.merge(all_months, sales_by_month, on='YEAR_MONTH', how='left').fillna(0)

sales_by_month = sales_by_month.sort_values('YEAR_MONTH')
sales_by_month['YEAR_MONTH'] = sales_by_month['YEAR_MONTH'].astype(str)
sales_by_month.columns = ['Month', 'Total Sales']

sales_by_month.to_csv('sales_amount_by_month_2-sonnet-3.5.csv', index=False)