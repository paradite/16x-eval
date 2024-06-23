You are tasked to implement a feature. Instructions are as follows:

Modify the python script to include months without sales in output csv.

Instructions for the output format:
- Output code without descriptions, unless it is important.
- Minimize prose, comments and empty lines.
- Only show the relevant code that needs to be modified. Use comments to represent the parts that are not modified.
- Make it easy to copy and paste.
- Consider other possibilities to achieve the result, do not be limited by the prompt.

code/script.py
```py
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
```

code/sales_data_sample_10.csv
```csv
ORDERNUMBER,QUANTITYORDERED,PRICEEACH,ORDERLINENUMBER,SALES,ORDERDATE,STATUS,QTR_ID,MONTH_ID,YEAR_ID,PRODUCTLINE,MSRP,PRODUCTCODE,CUSTOMERNAME,PHONE,ADDRESSLINE1,ADDRESSLINE2,CITY,STATE,POSTALCODE,COUNTRY,TERRITORY,CONTACTLASTNAME,CONTACTFIRSTNAME,DEALSIZE
10107,30,95.7,2,2871,2/24/2003 0:00,Shipped,1,2,2003,Motorcycles,95,S10_1678,Land of Toys Inc.,2125557818,897 Long Airport Avenue,,NYC,NY,10022,USA,NA,Yu,Kwai,Small
10121,34,81.35,5,2765.9,5/7/2003 0:00,Shipped,2,5,2003,Motorcycles,95,S10_1678,Reims Collectables,26.47.1555,59 rue de l'Abbaye,,Reims,,51100,France,EMEA,Henriot,Paul,Small
10134,41,94.74,2,3884.34,7/1/2003 0:00,Shipped,3,7,2003,Motorcycles,95,S10_1678,Lyon Souveniers,+33 1 46 62 7555,27 rue du Colonel Pierre Avia,,Paris,,75508,France,EMEA,Da Cunha,Daniel,Medium
10145,45,83.26,6,3746.7,8/25/2003 0:00,Shipped,3,8,2003,Motorcycles,95,S10_1678,Toys4GrownUps.com,6265557265,78934 Hillside Dr.,,Pasadena,CA,90003,USA,NA,Young,Julie,Medium
10159,49,100,14,5205.27,10/10/2003 0:00,Shipped,4,10,2003,Motorcycles,95,S10_1678,Corporate Gift Ideas Co.,6505551386,7734 Strong St.,,San Francisco,CA,,USA,NA,Brown,Julie,Medium
10168,36,96.66,1,3479.76,10/28/2003 0:00,Shipped,4,10,2003,Motorcycles,95,S10_1678,Technics Stores Inc.,6505556809,9408 Furth Circle,,Burlingame,CA,94217,USA,NA,Hirano,Juri,Medium
10180,29,86.13,9,2497.77,11/11/2003 0:00,Shipped,4,11,2003,Motorcycles,95,S10_1678,Daedalus Designs Imports,20.16.1555,"184, chausse de Tournai",,Lille,,59000,France,EMEA,Rance,Martine,Small
10188,48,100,1,5512.32,11/18/2003 0:00,Shipped,4,11,2003,Motorcycles,95,S10_1678,Herkku Gifts,+47 2267 3215,"Drammen 121, PR 744 Sentrum",,Bergen,,N 5804,Norway,EMEA,Oeztan,Veysel,Medium
10201,22,98.57,2,2168.54,12/1/2003 0:00,Shipped,4,12,2003,Motorcycles,95,S10_1678,Mini Wheels Co.,6505555787,5557 North Pendale Street,,San Francisco,CA,,USA,NA,Murphy,Julie,Small
10211,41,100,14,4708.44,1/15/2004 0:00,Shipped,1,1,2004,Motorcycles,95,S10_1678,Auto Canal Petit,(1) 47.55.6555,"25, rue Lauriston",,Paris,,75016,France,EMEA,Perrier,Dominique,Medium
```