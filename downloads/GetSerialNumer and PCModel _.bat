wmic bios get serialnumber  > SerialNumberAndPCModel.txt
^
wmic computersystem get manufacturer >> SerialNumberAndPCModel.txt 
^
wmic computersystem get model >> SerialNumberAndPCModel.txt
pause
start SerialNumberAndPCModel.txt