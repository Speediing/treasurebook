terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "~> 0.3"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}
provider "vercel" {
  # Optional default team for all resources
  team = "team_zfgWnJXv2XUd0rTW2okTYvSZ"
}

provider "aws" {
  region = "us-west-2"
}

resource "aws_secretsmanager_secret" "example" {
  name = "example"
}

data "aws_secretsmanager_secret_version" "example" {
  secret_id = aws_secretsmanager_secret.example.id
}

resource "vercel_project" "example" {
  name      = "example-project-jasonwiker"
  framework = "nextjs"
}

# An environment variable that will be created
# for this project for the "production" environment.
resource "vercel_project_environment_variable" "example2" {
  project_id = vercel_project.example.id
  key        = "foo"
  value      =  data.aws_secretsmanager_secret_version.example.secret_string
  target     = ["production"]
}
