import pdb
import boto3
from datetime import datetime, timedelta
from forex_python.converter import CurrencyRates

client = boto3.client(
    'ce',
    region_name='eu-west-1',
    aws_access_key_id='AKIAIHCJGK3HCFP6GWOQ',
    aws_secret_access_key='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'
)

start = datetime.now()-timedelta(days=30)
end = datetime.now()

start = start.strftime('%Y-%m-%d')
end = end.strftime('%Y-%m-%d')

response = client.get_cost_and_usage(
    TimePeriod={
        'Start': start,
        'End': end
    },
    Granularity='MONTHLY',
    Metrics=[
        # 'BLENDED_COST', 'UNBLENDED_COST', 'AMORTIZED_COST', 'NET_UNBLENDED_COST', 'NET_AMORTIZED_COST', 'USAGE_QUANTITY', 'NORMALIZED_USAGE_AMOUNT'
        'UNBLENDED_COST'
    ],
)

response = response.get('ResultsByTime')[-1]

curr_bill = response.get('Total').get('UnblendedCost').get('Amount')
curr_bill = float(curr_bill)

c = CurrencyRates()
curr_bill = c.convert('USD', 'INR', curr_bill)
# metric, _ = Metrics.objects.get_or_create(name='current_bill', value=current_bill)

print(curr_bill)
