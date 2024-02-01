terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "~> 0.3"
    }
  }
}
provider "vercel" {


  # Optional default team for all resources
  team = "team_zfgWnJXv2XUd0rTW2okTYvSZ"
}

resource "vercel_project" "example" {
  name      = "example-project-jasonwiker"
  framework = "nextjs"
}

# An environment variable that will be created
# for this project for the "production" environment.
resource "vercel_project_environment_variable" "example" {
  project_id = vercel_project.example.id
  key        = "foo"
  value      = "bar"
  target     = ["production"]
}
