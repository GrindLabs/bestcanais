import re


def sanitize_name(name):
    """Sanitize a string

    Arguments:
        name {string} -- The string to sanitize

    Returns:
        string -- The sanitized string
    """
    return re.sub(r'[\s\W_]', '', name.lower())
