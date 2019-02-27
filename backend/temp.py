import os

for root, directory, filenames in os.walk('./uploads/'):
    for x in filenames:
        print(root,x)
