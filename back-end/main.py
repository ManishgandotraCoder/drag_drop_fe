from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from pydantic import BaseModel, Field
import sqlite3
import json
from sqlite3 import IntegrityError, OperationalError

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000","https://drag-drop-fe.vercel.app"],  # Adjust this to the frontend's URL or use ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection and setup
def get_db_connection():
    conn = sqlite3.connect("dbRecords.db")
    conn.row_factory = sqlite3.Row  # To return rows as dictionaries
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS dbRecords (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            arr JSON NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db()  # Initialize the database on startup

# Define validation for the Record model
class Record(BaseModel):
    arr: list = Field(..., description="Array of records")

# Get all records
@app.get('/record')
def user_list():
    conn = get_db_connection()
    query = "SELECT * FROM dbRecords"
    record = conn.execute(query).fetchone()
    conn.close()

    if record:
        return {
            'records': {**dict(record), 'arr': json.loads(record['arr'])},
            "message": "Record fetched successfully"
        }
    else:
        return {
            'records': None,
            "message": "No record found"
        }

# Add a new record
@app.post('/record')
def user_add(record: Record):
    try:
        conn = get_db_connection()
        conn.execute('INSERT INTO dbRecords (arr) VALUES (?)', 
                     (json.dumps(record.arr),))  # Serialize the list
        conn.commit()
        conn.close()

        return {'message': 'Record added successfully'}

    except IntegrityError:
        raise HTTPException(status_code=400, detail="Integrity error: Invalid data or duplicate entry.")

    except OperationalError as e:
        raise HTTPException(status_code=500, detail=f"Operational error: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

# Update an existing record by ID
@app.put('/record/{id}')
def user_update(record: Record, id: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if the record exists
        cursor.execute('SELECT * FROM dbRecords WHERE id = ?', (id,))
        existing_record = cursor.fetchone()

        if existing_record is None:
            raise HTTPException(status_code=404, detail="Record not found")

        # Update the record with serialized JSON data
        cursor.execute('UPDATE dbRecords SET arr = ? WHERE id = ?', 
                       (json.dumps(record.arr), id))
        conn.commit()
        conn.close()

        return {'message': 'Record updated successfully'}

    except IntegrityError:
        raise HTTPException(status_code=400, detail="Integrity error: Invalid data or duplicate entry.")

    except OperationalError as e:
        raise HTTPException(status_code=500, detail=f"Operational error: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

# Delete a record by ID
@app.delete('/record/{id}')
def user_delete(id: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if the record exists
        cursor.execute('SELECT * FROM dbRecords WHERE id = ?', (id,))
        record = cursor.fetchone()

        if record is None:
            raise HTTPException(status_code=404, detail="Record not found")

             # Delete the record
        cursor.execute('DELETE FROM dbRecords WHERE id = ?', (id,))
        conn.commit()
        conn.close()

        return {'message': 'Record deleted successfully'}

    except IntegrityError:
        raise HTTPException(status_code=400, detail="Integrity error: Invalid data or duplicate entry.")

    except OperationalError as e:
        raise HTTPException(status_code=500, detail=f"Operational error: {str(e)}")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")
