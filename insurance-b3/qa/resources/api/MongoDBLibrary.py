from pathlib import Path
from dotenv import load_dotenv
from pymongo import MongoClient
import os
import time


class MongoDBLibrary:

    def __init__(self):
        project_root = Path(__file__).resolve().parents[4]
        env_path = project_root / "backend" / ".env"

        load_dotenv(env_path)

        mongo_uri = os.getenv("MONGO_URI")

        if not mongo_uri:
            raise Exception("MONGO_URI não encontrada no backend/.env")

        self.client = MongoClient(mongo_uri)
        self.db = self.client.get_database()

    def usuario_deve_existir_no_mongo(self, email):

        for _ in range(5):

            user = self.db["users"].find_one({
                "email": email
            })

            if user:
                return True

            time.sleep(1)

        raise AssertionError(
            f"Usuário {email} não encontrado no MongoDB"
        )

    def policy_deve_existir_no_mongo(self, cpf, status):

        for _ in range(5):

            policy = self.db["policies"].find_one({
                "cpf": str(cpf),
                "status": status
            })

            if policy:
                return True

            time.sleep(1)

        raise AssertionError(
            f"Policy com CPF {cpf} e status {status} não encontrada no MongoDB"
        )