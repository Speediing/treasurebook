
provider "vercel" {
  # Optional default team for all resources
  team = "team_zfgWnJXv2XUd0rTW2okTYvSZ"
}

provider "aws" {
  region = "us-west-2"
}

data "aws_secretsmanager_secret_version" "example" {
  for_each   = var.environemntVariables
  secret_id = key.value
}

resource "vercel_project" "example" {
  name      = "example-project-jasonwiker"
  framework = "nextjs"
}

# An environment variable that will be created
# for this project for the "production" environment.
resource "vercel_project_environment_variable" "example2" {
  for_each   = data.aws_secretsmanager_secret_version
  project_id = vercel_project.example.id
  key        = "foo"
  value      =  for_each.value.example.secret_string
  target     = ["production"]
}
