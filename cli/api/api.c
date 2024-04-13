#include <stdio.h>
#include <stdlib.h>
#include <curl/curl.h>

// Callback function to handle response data
size_t writeCallback(void *ptr, size_t size, size_t nmemb, void *userdata)
{
    FILE *stream = (FILE *)userdata;
    if (stream == NULL)
        return 0;

    size_t written = fwrite(ptr, size, nmemb, stream);
    return written;
}

// Function to call the ctodo login API and save the response
int login(const char *apikey){
    CURL *curl;
    CURLcode res;

    // Initialize libcurl
    curl = curl_easy_init();
    if (curl == NULL)
    {
        fprintf(stderr, "Error: curl_easy_init() failed\n");
        return 1;
    }

    // Prepare the URL with the API key
    char url[256];
    snprintf(url, sizeof(url), "https://reqres.in/api/users/%s", apikey);

    // Set the URL for ctodo login API
    curl_easy_setopt(curl, CURLOPT_URL, url);

    // Set the callback function for response data
    FILE *responseFile = fopen("response.txt", "w");
    if (responseFile == NULL)
    {
        fprintf(stderr, "Error: Failed to open response file\n");
        curl_easy_cleanup(curl);
        return 1;
    }

    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, writeCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, responseFile);

    // Perform the GET request for login
    curl_easy_setopt(curl, CURLOPT_HTTPGET, 1L);

    // Perform the request
    res = curl_easy_perform(curl);
    if (res != CURLE_OK)
    {
        fprintf(stderr, "Error: curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        fclose(responseFile);
        curl_easy_cleanup(curl);
        return 1;
    }

    // Cleanup and close the response file
    fclose(responseFile);

    // Cleanup libcurl
    curl_easy_cleanup(curl);                                                    

    return 0; // API call successful
}                                                                                                                        