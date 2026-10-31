from pydantic import BaseModel, Field

class CreateUserRequest(BaseModel):
    nom : str = Field(..., min_length=2, max_length=50)
    prenom : str = Field(..., min_length=2, max_length=50)
    mail : str | None = None
    service : str | None = None
    tel : str | None = None
class ValidationError(BaseModel):
    field: str
    message: str

class CreateUserResponse(BaseModel):
    success: bool
    user_id: str | None = None
    errors: list[ValidationError] = []