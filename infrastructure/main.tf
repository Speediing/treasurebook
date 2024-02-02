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


module "proejctOne" {
  source  = "./VercelProject"
 
}