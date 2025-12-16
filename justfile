run:
	cd Neti.Client && ng serve &
	dotnet run --project Neti.API/Neti.API.csproj

run-client:
    cd Neti.Client && ng serve

run-api:
    dotnet run --project Neti.API/Neti.API.csproj
