import os
import sys
from dotenv import load_dotenv, set_key, find_dotenv

def print_usage():
    print("""
Usage: python manage_env.py <command> [key] [value]

Commands:
  list              List all environment variables
  get <key>         Get value of a specific environment variable
  set <key> <value> Set value of an environment variable
  remove <key>      Remove an environment variable

Example:
  python manage_env.py list
  python manage_env.py get DB_HOST
  python manage_env.py set DB_HOST localhost
  python manage_env.py remove DB_HOST
""")

def list_env_vars():
    load_dotenv()
    env_vars = {
        "DB_HOST": os.getenv("DB_HOST", "localhost"),
        "DB_NAME": os.getenv("DB_NAME", "sentiment_db"),
        "DB_USER": os.getenv("DB_USER", "sentiment_user"),
        "DB_PASSWORD": os.getenv("DB_PASSWORD", "[HIDDEN]"),
        "DB_PORT": os.getenv("DB_PORT", "5432"),
        "FLASK_ENV": os.getenv("FLASK_ENV", "development"),
        "FLASK_DEBUG": os.getenv("FLASK_DEBUG", "True"),
        "FLASK_HOST": os.getenv("FLASK_HOST", "0.0.0.0"),
        "FLASK_PORT": os.getenv("FLASK_PORT", "5000")
    }
    
    print("\nCurrent Environment Variables:")
    print("-" * 50)
    for key, value in env_vars.items():
        print(f"{key}: {value}")

def get_env_var(key):
    load_dotenv()
    value = os.getenv(key)
    if value is None:
        print(f"Environment variable '{key}' not found")
    else:
        print(f"{key}: {value if key != 'DB_PASSWORD' else '[HIDDEN]'}")

def set_env_var(key, value):
    dotenv_path = find_dotenv()
    if not dotenv_path:
        dotenv_path = ".env"
    set_key(dotenv_path, key, value)
    print(f"Set {key}={value if key != 'DB_PASSWORD' else '[HIDDEN]'}")

def remove_env_var(key):
    dotenv_path = find_dotenv()
    if not dotenv_path:
        print(".env file not found")
        return
    set_key(dotenv_path, key, "")
    print(f"Removed {key}")

def main():
    if len(sys.argv) < 2:
        print_usage()
        return

    command = sys.argv[1].lower()

    try:
        if command == "list":
            list_env_vars()
        elif command == "get" and len(sys.argv) == 3:
            get_env_var(sys.argv[2])
        elif command == "set" and len(sys.argv) == 4:
            set_env_var(sys.argv[2], sys.argv[3])
        elif command == "remove" and len(sys.argv) == 3:
            remove_env_var(sys.argv[2])
        else:
            print_usage()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()