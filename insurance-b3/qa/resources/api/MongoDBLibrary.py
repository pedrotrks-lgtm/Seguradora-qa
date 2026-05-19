from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient
import os


class MongoDBLibrary:

    def __init__(self):
        project_root = Path(__file__).resolve().parents[4]
        env_path = project_root / "backend" / ".env"

        load_dotenv(env_path)

        mongo_uri = os.getenv("MONGO_URI")

        if not mongo_uri:
            raise Exception("MONGO_URI não encontrada no backend/.env")

        self.client = MongoClient(mongo_uri)
        self.db = self.client["seguradora_b3"]

    def usuario_deve_existir_no_mongo(self, email):
        user = self.db["users"].find_one({"email": email})

        if not user:
            raise AssertionError(f"Usuário {email} não encontrado no MongoDB")

    def policy_deve_existir_no_mongo(self, cpf, status):
        policy = self.db["policies"].find_one({
            "cpf": cpf,
            "status": status
        })

        if not policy:
            raise AssertionError(f"Policy com CPF {cpf} e status {status} não encontrada no MongoDB")