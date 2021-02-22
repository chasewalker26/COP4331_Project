import unittest
import requests
import json
import scan

class TestScan(unittest.TestCase):
	def test_UPC_lookup(self):
		response = scan.UPC_lookup("1B187D1406FF56216D9D01B71C6B40B7", "619659161347")
		value = "https://api.upcdatabase.org/product/619659161347?apikey=1B187D1406FF56216D9D01B71C6B40B7"
		self.assertEqual(response, value)

if __name__ == '__main__':
	unittest.main()