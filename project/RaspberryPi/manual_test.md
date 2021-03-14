# Manual Test for barcode_reader()

Here, I would like to leave a not about why it was not possible to write a test case for the barcode_reader() function. The function continuously waits for an input from the scanner; therefore, it does not return a value until a barcode is scanned. This prevents us from testing the funcion from a different class. However, we have constracted manual test for this specific function, and it turns out that it is working as desired.

| Step | Action | Reaction |
|----|------------|--------|
| 001 | Power the Raspberry Pi via the Micro USB port on the side of the unit | Verify that the led light turns on |
| 002 | Wait 30 seconds for the Raspberry Pi to boot up | Led light is still on |
| 003 | Connect the scanner to the the Raspberry Pi | Led indicator of the scanner is turned on |
| 004 | Connect to the the Raspberry Pi using the ssh protocol | Password is asked |
| 005 | Sign in using the user credentials | Access is granted |
| 006 | Run the python code that will print the scanned barcodes to the terminal | Program starts running |
| 007 | Scan an item | A barcode number is printed |
| 008 | Compare the barcode number printed to the screen with the barcode number on the item | Validate that they match |
| 009 | Repeat steps 007 and 008 for 10 different items | Validate that barcode_reader() is working as desired for each item |
