import boto3

aws_access_key_id = "AKIAWMG5W6QIS7LTPJZW"
aws_secret_access_key = "J2ZFY6SAnMLn9oDAGdMJq48f1XJMpk3ZLL0t44v"

session = boto3.Session(
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
)

# Now that you have the session, you can get the resource/service clients you need.
s3 = session.resource('s3')

# Print out bucket names to verify connection.
for bucket in s3.buckets.all():
    print(bucket.name)