import unittest
import requests
import json
import scan

# Here, I would like to leave a not about why it was not possible to
# write a test case for the barcode_reader() function.
# The function continuously waits for an input from the
# scanner; therefore, it does not return a value until a barcode is
# scanned. This prevents us from testing the funcion from a different class.
# However, we have constracted manual test for this specific function, and it
# turns out that it is working as desired.

class TestScan(unittest.TestCase):
	def test_UPC_lookup(self):
		response = scan.UPC_lookup("1B187D1406FF56216D9D01B71C6B40B7", "619659161347")
		value = "https://api.upcdatabase.org/product/619659161347?apikey=1B187D1406FF56216D9D01B71C6B40B7"
		self.assertEqual(response, value)

if __name__ == '__main__':
	unittest.main()
