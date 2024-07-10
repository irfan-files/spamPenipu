import json
import random
import string

def generate_large_dataset(file_path, num_records):
    data_sets = []
    
    for _ in range(num_records):
        nohp1 = ''.join(random.choices(string.digits, k=12))
        email = ''.join(random.choices(string.ascii_letters + string.digits, k=8)) + '@' + 'gmail' + '.' + 'com'
        nohp2 = ''.join(random.choices(string.digits, k=12))
        pin = [str(random.randint(0, 9)) for _ in range(6)]
        otp = ''.join(random.choices(string.digits, k=7))
        
        data_sets.append({
            "nohp1": nohp1,
            "email": email,
            "nohp2": nohp2,
            "pin": pin,
            "otp": otp
        })

    with open(file_path, 'w') as file:
        json.dump(data_sets, file)

if __name__ == "__main__":
    file_path = 'dataSets_large.json'
    num_records = 1000000
    generate_large_dataset(file_path, num_records)
