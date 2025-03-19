# -*- coding: utf-8 -*-
"""
Created on Wed Mar 19 13:11:17 2025

@author: gabroliveros
"""

import unittest
from cv2json import app, validate_date, validate_iso_code

class TestCV2JSON(unittest.TestCase):
    
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_validate_date(self):
        self.assertTrue(validate_date("2023-10-01"))
        self.assertFalse(validate_date("01-10-2023"))
        self.assertFalse(validate_date("2023/10/01"))

    def test_validate_iso_code(self):
        self.assertTrue(validate_iso_code("es", "language"))
        self.assertFalse(validate_iso_code("esp", "language"))
        self.assertTrue(validate_iso_code("ES", "country"))
        self.assertFalse(validate_iso_code("ESP", "country"))

    def test_generate_cv_endpoint(self):
        response = self.app.post('/generate_cv', json={
            "date_of_birth": "1990-01-01",
            "document_language": "en",
            "names": "John",
            "surnames": "Doe"
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn("metadata", response.get_json())

if __name__ == '__main__':
    unittest.main()