##Intro##

A simple node-red node that provides basic control of 1602 LCD's with i2c driver backpacks (using PCF8574P drivers).

Tested on Raspbian Jessie and should work with all RPi models.


##Requirements##

- Raspberry Pi of your choice
- A LCD 1602 panel that has an i2c driver
- i2c-lcd (available in npm repo, but may require a manual compile since the i2c library v0.1.x do not compile on current node versions)

##Notes##

- Should work fine on a larger dispaly (e.g. 2004), but need to add extra line numbers
- Super fast updates can cause the display to glitch out, so consider using the Delay node in speed limiting mode
- Feel free to suggest new features and corrections!

Johnty Wang
Input Devices and Music Interaction Laboratory
McGill University and Infusion Systems
johnty.wang@mail.mcgill.ca

July 2016
