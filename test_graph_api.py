import requests

data = {
    "email": "c3bca2b2@example.com",
    "password": "hashed_password1"
}
res = requests.post("http://localhost:8000/api/v1/auth/login", json=data)
if res.status_code == 200:
    token = res.json()["data"]["token"]
    graph_res = requests.get("http://localhost:8000/api/v1/analytics/graph-data", headers={"Authorization": f"Bearer {token}"})
    print(graph_res.json())
else:
    print("Login failed", res.text)
