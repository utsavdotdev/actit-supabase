@echo off


rem Specify the directory where you want to place the executable
set "install_dir=C:\Program Files\ctodo"

rem Create the installation directory if it doesn't exist
if not exist "%install_dir%" mkdir "%install_dir%"

rem Check if the executable already exists in the installation directory
if exist "%install_dir%\ctodo.exe" (
    echo Replacing existing executable...
    cd ..
    copy /Y ctodo "%install_dir%"
) else (
    echo Installing new executable...
    cd ..
    copy ctodo "%install_dir%"
)

rem Add the installation directory to the user PATH if not already included
setx PATH "%install_dir%;%PATH%" /m


echo Configuration completed. 'ctodo' is now available globally
