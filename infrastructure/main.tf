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