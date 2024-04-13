#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <time.h>
#include <curl/curl.h>

#define MAX_TASKS 100
#define MAX_TASK_LENGTH 100
#define FILENAME "tasks.txt"
#define UNDERLINE "\033[4m"
#define RESET "\033[0m"
#define RED "\033[1;31m"
#define GREEN "\033[1;32m"
#define BOLD "\033[1m"
#define CYAN "\033[1;36m"
#define LIGHT_GREEN "\033[1;32m"

// Structure to represent a task
struct Task
{
    char des[MAX_TASK_LENGTH];
    bool status;
    time_t createdAt;
    time_t completedAt;
};

// Global array to store tasks
struct Task tasks[MAX_TASKS];
int num_tasks = 0;

// Function prototypes
void addTask(const char *des);
void deleteTask(int index);
void markDone(int index);
void markUndone(int index);
void listTasks(bool showTime);
void printUsage();
void loadTasks();
void saveTasks();
void user();
void aboutus();
int login(const char *apikey);

int main(int argc, char *argv[])
{
    // Check if there are command-line arguments
    if (argc < 2)
    {
        printUsage();
        return 1; // Return an error code
    }
    loadTasks();

    bool showTime = false;

    if (argc == 3 && strcmp(argv[1], "list") == 0 && strcmp(argv[2], "-t") == 0)
    {
        showTime = true;
    }

    if (strcmp(argv[1], "add") == 0)
    {
        if (argc < 3)
        {
            printf("\n%sError: Missing task description%s\n", BOLD, RESET);
            printUsage();
            return 1;
        }
        char taskDescription[MAX_TASK_LENGTH] = "";
        for (int i = 2; i < argc; i++)
        {
            strcat(taskDescription, argv[i]);
            strcat(taskDescription, " ");
        }
        addTask(taskDescription);
    }
    else if (strcmp(argv[1], "delete") == 0)
    {
        if (argc != 3)
        {
            printf("\n%sError: Invalid arguments for delete command%s\n", BOLD, RESET);
            printUsage();
            return 1;
        }
        int index = atoi(argv[2]);
        deleteTask(index);
    }
    else if (strcmp(argv[1], "undone") == 0)
    {
        if (argc != 3)
        {
            printf("\n%sError: Invalid arguments for undone command%s\n", BOLD, RESET);
            printUsage();
            return 1;
        }
        int index = atoi(argv[2]);
        markUndone(index);
    }
    else if (strcmp(argv[1], "login") == 0)
    {
        if (argc < 2)
        {
            printf("\n%sError: Invalid arguments for login command%s\n", BOLD, RESET);
            printUsage();
            return 1;
        }
        char apikey[100];
        printf("Enter the API key: ");
        scanf("%s", apikey);
        system("clear");
        login(apikey) ? printf("\n%sLogin failed%s\n", RED, RESET) : printf("\n%sLogin successful%s\n", GREEN, RESET);
    }
    else if (strcmp(argv[1], "user") == 0)
    {
        user();
    }
    else if (strcmp(argv[1], "aboutus") == 0)
    {
        aboutus();
    }
    else if (strcmp(argv[1], "help") == 0)
    {
        printUsage();
    }
    else if (strcmp(argv[1], "list") == 0)
    {
        listTasks(showTime);
    }
    else if (strcmp(argv[1], "done") == 0)
    {
        if (argc != 3)
        {
            printf("\n%sError: Invalid arguments for done command%s\n", BOLD, RESET);
            printUsage();
            return 1;
        }
        int index = atoi(argv[2]);
        markDone(index);
    }
    else
    {
        printf("\n%sError: Invalid command%s\n", BOLD, RESET);
        printUsage();
        return 1;
    }

    saveTasks();

    return 0; // Return success
}

void addTask(const char *des)
{
    if (num_tasks >= MAX_TASKS)
    {
        printf("Error: Cannot add more tasks. Task list full.\n");
        return;
    }

    struct Task newTask;
    strncpy(newTask.des, des, MAX_TASK_LENGTH - 1);
    newTask.des[MAX_TASK_LENGTH - 1] = '\0';
    newTask.status = false;
    newTask.createdAt = time(NULL);
    newTask.completedAt = 0;

    tasks[num_tasks++] = newTask;

    printf("\n%sTask added successfully!%s\n", GREEN, RESET);

    saveTasks(); // Save tasks after adding a new one
}

// Function to delete a task
void deleteTask(int index)
{
    if (index < 1 || index > num_tasks)
    {
        printf("\n%sError: Invalid task index%s\n", RED, RESET);
        return;
    }

    for (int i = index - 1; i < num_tasks - 1; i++)
    {
        tasks[i] = tasks[i + 1];
    }
    num_tasks--;

    printf("\n%sTask deleted successfully!%s\n", GREEN, RESET);
}

// Function to list all tasks
void listTasks(bool showTime)
{
    if (num_tasks == 0)
    {
        printf("\nNo tasks available.\n");
        return;
    }
    printf("\n%s%sTasks%s:\n", CYAN, UNDERLINE, RESET);

    for (int i = 0; i < num_tasks; i++)
    {
        char dateStr[26];
        strftime(dateStr, sizeof(dateStr), "%Y-%m-%d %H:%M:%S", localtime(&tasks[i].createdAt));
        printf("\n%d. [%s%c%s] %s", i + 1, tasks[i].status ? LIGHT_GREEN : "", tasks[i].status ? 'X' : ' ', RESET, tasks[i].des);

        if (showTime)
        {
            printf(" - Created at: %s", dateStr);
            if (tasks[i].status && tasks[i].completedAt != 0)
            {
                strftime(dateStr, sizeof(dateStr), "%Y-%m-%d %H:%M:%S", localtime(&tasks[i].completedAt));
                printf(", Completed at: %s", dateStr);
            }
        }

        printf("\n");
    }
}

void loadTasks()
{
    FILE *file = fopen(FILENAME, "r");
    if (file == NULL)
    {
        printf("\nFile does not exist. Creating a new file.\n");
        saveTasks(); // Create a new file
        return;
    }

    num_tasks = 0;
    while (fread(&tasks[num_tasks], sizeof(struct Task), 1, file) == 1)
    {
        num_tasks++;
    }

    fclose(file);
}

void saveTasks()
{
    FILE *file = fopen(FILENAME, "w");
    if (file == NULL)
    {
        printf("Error: Failed to open file for saving tasks.\n");
        return;
    }

    for (int i = 0; i < num_tasks; i++)
    {
        fwrite(&tasks[i], sizeof(struct Task), 1, file);
    }

    fclose(file);
}

// Function to print program usage
void printUsage()
{
    printf("\nUsage: todo <command>\n");
    printf("Commands:\n");
    printf("  login                Login to console\n");
    printf("  add <description>    Add a new task\n");
    printf("  delete <index>       Delete the task at the specified index\n");
    printf("  done <index>         Update the status of the task at the specified index\n");
    printf("  list [-t]            List all tasks\n");
    printf("  user                 Fetch the user details\n");
    printf("  help                 Print usage\n");
}

// Function to mark a task as done
void markDone(int index)
{
    if (index < 1 || index > num_tasks)
    {
        printf("Error: Invalid task index.\n");
        return;
    }

    tasks[index - 1].status = true;
    tasks[index - 1].completedAt = time(NULL);
    printf("\n%sTask marked as done.%s\n", GREEN, RESET);
}

void markUndone(int index){
    if (index < 1 || index > num_tasks)
    {
        printf("Error: Invalid task index.\n");
        return;
    }

    tasks[index - 1].status = false;
    tasks[index - 1].completedAt = 0;
    printf("\n%sTask marked as undone.%s\n", GREEN, RESET);

}

void user()
{
    // Get the user Data
}

void aboutus()
{
    printf("\n📝 %sWelcome to Ctodo - Your Command Line Todo App%s \n",BOLD,RESET);
    printf("\nVersion: 1.0 \n");
    printf("Developed by: Your Name \n");
    printf("Website: %shttps://ctodo.io%s\n",UNDERLINE,RESET);
}