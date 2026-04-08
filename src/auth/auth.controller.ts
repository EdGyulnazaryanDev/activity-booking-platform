import { Controller, Post, Body, Get, UseGuards, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto, LoginDto, UpdateUserDto } from './dto/auth.dto';
import { ApiResponse, ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ 
    status: 201, 
    description: 'User registered successfully',
    schema: {
      example: {
        user: {
          id: 'clx123456789',
          email: 'user@example.com',
          name: 'John Doe',
          role: 'USER'
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid input data' 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'Conflict - Email already exists' 
  })
  @ApiBody({ type: RegisterDto })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiResponse({ 
    status: 200, 
    description: 'User logged in successfully',
    schema: {
      example: {
        user: {
          id: 'clx123456789',
          email: 'user@example.com',
          name: 'John Doe',
          role: 'USER'
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid credentials' 
  })
  @ApiBody({ type: LoginDto })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ 
    status: 200, 
    description: 'Profile retrieved successfully',
    schema: {
      example: {
        id: 'clx123456789',
        email: 'user@example.com',
        name: 'John Doe',
        role: 'USER',
        createdAt: '2023-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid token' 
  })
  getProfile(@CurrentUser() user: CurrentUserPayload) {
    return this.authService.getProfile(user.id);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ 
    status: 200, 
    description: 'Profile updated successfully',
    schema: {
      example: {
        id: 'clx123456789',
        email: 'user@example.com',
        name: 'John Doe Updated',
        role: 'USER',
        createdAt: '2023-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid token' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'User not found' 
  })
  @ApiBody({ type: UpdateUserDto })
  updateProfile(@CurrentUser() user: CurrentUserPayload, @Body() updateDto: UpdateUserDto) {
    return this.authService.updateProfile(user.id, updateDto);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ 
    status: 200, 
    description: 'Token refreshed successfully',
    schema: {
      example: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbHgxMjM0NTY3ODkiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiJ9...'
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized - Invalid token' 
  })
  refreshToken(@CurrentUser() user: CurrentUserPayload) {
    return this.authService.refreshToken(user.id);
  }
}
