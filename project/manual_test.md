# Manual Test for barcode_reader()

Here, I would like to leave a not about why it was not possible to write a test case for the barcode_reader() function. The function continuously waits for an input from the scanner; therefore, it does not return a value until a barcode is scanned. This prevents us from testing the funcion from a different class. However, we have constracted manual test for this specific function, and it turns out that it is working as desired.

| Step | Action | Reaction |
|----|------------|--------|
| 001 |   |   |   
