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

    def policy_deve_existir_no_mongo(self, policyNumber, status):

        policy = self.db["policies"].find_one({
            "policyNumber": policyNumber,
            "status": status
        })

        if not policy:
            raise AssertionError(
                f"Policy com número {policyNumber} e status {status} não encontrada no MongoDB"
            )

        return True

    def audit_log_deve_existir_no_mongo(self, policyNumber, event):

        for _ in range(15):

            audit = self.db["auditlogs"].find_one({
                "policyNumber": policyNumber,
                "event": event
            })

            if audit:
                return True

            time.sleep(2)

        all_audits = list(self.db["auditlogs"].find().limit(5))

        raise AssertionError(
            f"AuditLog {event} para policy {policyNumber} não encontrado no MongoDB. "
            f"Últimos registros encontrados: {all_audits}"
        )